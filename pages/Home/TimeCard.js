import React from 'react';
import styled from 'styled-components/native';

const Card = styled.TouchableOpacity`
  width: 100%;
  border-radius: 24px;
  background: ${props => props.evening ? '#0D21A1' : '#01BAEF'};
  height: 150px;
  margin-bottom: 20px;
  shadow-offset: 0 3px;
  shadow-color: black;
  shadow-radius: 12px; 
  shadow-opacity: 0.3;
  elevation: 2;
  position: relative;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 32px;
  font-weight: 800;
  color: #fff;
  position: absolute;
  margin: 20px;
  bottom: 0;
`;

const TimeCard = (props) => (
  <Card evening={props.evening} onPress={props.onPress}>
    <Title>{props.evening ? 'Evening Prayer' : 'Morning Prayer'}</Title>
  </Card>
);

export default TimeCard;
