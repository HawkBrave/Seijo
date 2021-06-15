import React from 'react';

export default function Alert({ content }) {
  return (
    <div className="alert alert-danger d-flex align-items-center" role="alert">
      <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlinkHref="#exclamation-triangle-fill"/></svg>
      <div>
        { content }
      </div>
    </div>
  );
}