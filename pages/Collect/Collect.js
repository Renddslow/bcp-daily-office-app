import React from 'react';
import styled from 'styled-components/native';
import { get } from 'dot-prop';

import { AppWrapper } from '../../components';
import withStorage from '../../utils/withStorage';

const Header = styled.Text`
  font-weight: 900;
  font-size: 20px;
`;

const FinalWords = styled.Text`
  font-style: italic;
  font-size: 18px;
  text-align: center;
  margin-top: 12px;
  padding-bottom: 44px;
`;

const Text = styled.Text`
  font-size: 24px;
`;

const Collect = (props) => {
  const { getParam } = props.navigation;
  const office = getParam('office');
  const collect = get(props.data, office, {});

  return (
    <AppWrapper>
      <Header>{collect.title}</Header>
      <Text>{'\n'}</Text>
      <Text>
        {collect.content}
      </Text>
      <FinalWords>Amen.</FinalWords>
    </AppWrapper>
  )
};

export default withStorage(Collect, 'data.attributes.collects');
