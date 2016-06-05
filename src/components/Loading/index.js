'use strict';

import React from 'react';
import classNames from 'classnames';

const Loading = ({loading}) => {

  var loadingClass = classNames({
    'hide': !loading
  });

  return (
    <div className={loadingClass}>
      <div id="loading_indeterminate"
           className="mdl-progress mdl-js-progress mdl-progress__indeterminate">
      </div>
    </div>
  );
};

export default Loading;
