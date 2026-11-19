import React, { useEffect, useState } from 'react';

const profileUrl = 'https://github.com/justrhey';
const activityUrl = 'https://github-contributions-api.jogruber.de/v4/justrhey?y=last';

export default function GitHubActivity() {
  const [activity, setActivity] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const controller = new AbortController();

    fetch(activityUrl, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('GitHub activity unavailable');
        return response.json();
      })
      .then((data) => {
        if (!Array.isArray(data.contributions) || !data.contributions.length) {
          throw new Error('GitHub activity unavailable');
        }
        setActivity(data);
        setStatus('ready');
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setStatus('error');
      });

    return () => controller.abort();
  }, []);

  const startDay = activity
    ? new Date(`${activity.contributions[0].date}T00:00:00Z`).getUTCDay()
    : 0;
  const activeDays = activity
    ? activity.contributions.filter(({ count }) => count > 0).length
    : 0;

  return (
    <section className="github-section" id="github" aria-labelledby="github-title">
      <div className="section-heading">
        <div><p className="eyebrow">05 / GITHUB ACTIVITY</p><h2 id="github-title">Still building.</h2></div>
        <p className="deck-intro">A year of public work, straight from my GitHub profile.</p>
      </div>
      <div className="github-activity">
        <div className="github-activity-head">
          <p>{status === 'ready' ? <><strong>{activity.total.lastYear.toLocaleString()}</strong> contributions across {activeDays} active days in the last year</> : status === 'loading' ? 'Loading contributions…' : 'Activity is unavailable right now.'}</p>
          <a href={profileUrl} target="_blank" rel="noreferrer">View GitHub profile ↗</a>
        </div>
        {activity && (
          <>
            <div className="github-calendar-scroll">
              <div className="github-calendar" role="img" aria-label={`${activity.total.lastYear} GitHub contributions in the last year`}>
                {Array.from({ length: startDay }, (_, index) => <span className="github-day-empty" key={`empty-${index}`} />)}
                {activity.contributions.map(({ date, count, level }) => (
                  <span className="github-day" data-level={level} key={date} title={`${date}: ${count} contribution${count === 1 ? '' : 's'}`} aria-hidden="true" />
                ))}
              </div>
            </div>
            <div className="github-legend" aria-hidden="true"><span>Less</span>{[0, 1, 2, 3, 4].map((level) => <i className="github-day" data-level={level} key={level} />)}<span>More</span></div>
          </>
        )}
      </div>
    </section>
  );
}
