import React, { useEffect } from 'react';
import { useHistory } from 'umi';
import Loading from '@/components/Loading';

export default () => {
  const history = useHistory();

  useEffect(() => {
    history.push('/Demo');
  }, []);

  return <Loading />;
};

// import React from 'react';
// import Redirect from 'umi/redirect';

// const index = () => {
//   return <Redirect push to={{ pathname: '/home' }} />;
// };

// export default index;
