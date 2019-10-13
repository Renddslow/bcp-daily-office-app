import React, { useEffect, useState } from 'react';
import { AsyncStorage } from 'react-native';
import { get } from 'dot-prop';
import catchify from 'catchify';

const getTodayKey = ({ navigation, day }) => {
  if (navigation && navigation.getParam) {
    return navigation.getParam('day');
  }

  return day;
};

const getItem = async (key) => {
  const [err, item] = await catchify(AsyncStorage.getItem(key));
  if (err) {
    return {};
  }

  return JSON.parse(item);
};

const withStorage = (WrapperComponent, key) => (props) => {
  const [data, setData] = useState(null);
  const today = getTodayKey(props);

  useEffect(() => {
    getItem(today).then((d) => {
      setData(get(d, key));
    })
  }, []);

  return (
    <WrapperComponent data={data} {...props} />
  );
};

export default withStorage;
