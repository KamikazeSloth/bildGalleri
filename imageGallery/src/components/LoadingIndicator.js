import React from 'react';

export const LoadingIndicator = ({ slowLoading }) => {
    return (
      <>
        {slowLoading && <div>It's slow...</div>}
        <div>...Loading</div>
      </>
    )
  }
