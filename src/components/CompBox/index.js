import React from 'react';
import './index.less';

export default function index({ title, children }) {
  return (
    <div className="coffee-compBox">
      {title && <div className="coffee-compBox-title">{title}</div>}
      <div className="coffee-compBox-content">{children}</div>
    </div>
  );
}
