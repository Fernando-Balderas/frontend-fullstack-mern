import React from 'react';
import { useLocation } from "react-router-dom";

const NoMatchPath: React.FC = () => {
  let location = useLocation();
  return (
    <div>
      <h3>Not found<code>{location.pathname}</code></h3>
    </div>
  )
}

export default NoMatchPath;
