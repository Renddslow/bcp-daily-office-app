import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import moment from 'moment';
import { AsyncStorage, Button } from 'react-native';
import catchify from 'catchify';

import TimeCard from './TimeCard';
import { AppWrapper } from '../../components';

const CardContainer = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const Header = styled.Text`
  font-weight: 900;
  font-size: 24px;
  margin-top: 36px;
`;

const fetchData = (day) => catchify(
  fetch(`https://renddslow.ngrok.io/days/${day}`).then((d) => d.json())
);

const saveData = (day) => async ([err, data]) => {
  if (!err) {
    await AsyncStorage.setItem(day, JSON.stringify(data));
  } else {
    return err;
  }
};

const dataIsCached = async (day) => {
  const [err, storedDay] = await catchify(AsyncStorage.getItem(day));
  return !err && storedDay;
};

const refresh = async (todayKey) => {
  saveData(todayKey)(await fetchData(todayKey))
};

const Home = (props) => {
  const { navigate } = props.navigation;
  const today = moment();
  const todayKey = today.format('YYYY-MM-DD');

  useEffect(() => {
    dataIsCached(todayKey).then(async (isCached) => {
      if (!isCached) {
        return saveData(todayKey)(await fetchData(todayKey));
      }
    });
  }, []);

  return (
    <AppWrapper>
      <Header>{today.format('MMMM D')}</Header>
      <CardContainer>
        <TimeCard
          onPress={() => navigate('Office', { type: 'morning', day: todayKey })}
        />
        <TimeCard
          evening
          onPress={() => navigate('Office', { type: 'evening', day: todayKey })}
        />
      </CardContainer>
      <Button title="Refresh Data" onPress={() => refresh(todayKey)} />
    </AppWrapper>
  );
};

export default Home;
