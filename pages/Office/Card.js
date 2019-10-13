import React from 'react';
import styled from 'styled-components';

const CardView = styled.TouchableOpacity`
  width: 100%;
  border-radius: 24px;
  background: ${props => props.color || '#fff'};
  margin-bottom: 20px;
  shadow-offset: 0 3px;
  shadow-color: black;
  shadow-radius: 12px; 
  shadow-opacity: 0.3;
  elevation: 2;
  padding: 20px;
`;

const UnavailableCardView = styled.TouchableOpacity`
  width: 100%;
  border-radius: 24px;
  background: #fff;
  border: 2px dashed #d9d9d9;
  margin-bottom: 20px;
  padding: 20px;
`;

const RefText = styled.Text`
  font-size: 24px;
  font-weight: 800;
  margin-top: 12px;
`;

const UnavailableText = styled.Text`
  font-size: 12px;
  margin-top: 12px;
`;

const TypeText = styled.Text`
  font-size: 12px;
  font-weight: 800;
`;

const Card = (props) => {
  // TODO: Add check mark for completed readings
  return props.isAvailable ?
    (
      <CardView onPress={props.onPress}>
        <TypeText>{props.type}</TypeText>
        <RefText>{props.reference}</RefText>
      </CardView>
    ) :
    (
      <UnavailableCardView disabled>
        <TypeText>{props.type}</TypeText>
        <UnavailableText>
          Readings from the deuterocanon are not currently supported. Look for them in a future update.
        </UnavailableText>
        <RefText>{props.reference}</RefText>
      </UnavailableCardView>
    );
};

export default Card;
