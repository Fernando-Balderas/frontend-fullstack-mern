import React from 'react';
import { useLocation } from "react-router-dom";

function NoMatchPath() {
  let location = useLocation();
  return (
    <div>
      <h3>Not found<code>{location.pathname}</code></h3>
    </div>
  )
}

export default NoMatchPath
