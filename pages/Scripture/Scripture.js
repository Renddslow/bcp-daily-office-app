import React from 'react';
import { get } from 'dot-prop';
import styled from 'styled-components';

import { AppWrapper } from '../../components';
import withStorage from '../../utils/withStorage';
import getText from './getText';

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

const Scripture = (props) => {
  const { getParam } = props.navigation;
  const office = getParam('office');
  const type = getParam('type');
  const { ref: reference, verses, isDeutero } = get(props.data, `${office}.${type}`, {});

  // TODO: Place reference over each reading
  return (
    <AppWrapper>
      {
        Array.isArray(get(verses, '0')) ?
          verses.map((psalms, idx) => (
            <React.Fragment key={`psalm-${idx}`}>
              <Header>{reference[idx]}</Header>
              <Text>{'\n'}</Text>
              {
                getText(psalms)
              }
            </React.Fragment>
          )) :
          (
            <>
              <Header>{reference}</Header>
              <Text>{'\n'}</Text>
              {
                getText(verses)
              }
              <FinalWords>
                {
                  !!isDeutero ?
                    'Here ends the reading.' :
                    'The Word of the Lord.'
                }
              </FinalWords>
            </>
          )
      }
    </AppWrapper>
  );
};

export default withStorage(Scripture, 'data.attributes.offices');
