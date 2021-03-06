import React from 'react';
import { get } from 'dot-prop';

import withStorage from '../../utils/withStorage';
import { AppWrapper } from '../../components';
import Card from './Card';

const Office = (props) => {
  const { getParam, navigate } = props.navigation;
  const office = getParam('type');
  const psalmRefs = get(props.data, `offices.${office}.psalms.ref`, []);

  const scriptureNav = (type) => () => navigate('Scripture', { office, type, day: getParam('day') });
  const collectNav = () => navigate('Collect', { office,  day: getParam('day') });

  return (
    <AppWrapper>
      <Card
        isAvailable
        reference={psalmRefs.join(', ')}
        type={psalmRefs.length > 1 ? 'Psalm Readings' : 'Psalm Reading'}
        onPress={scriptureNav('psalms')}
      />
      <Card
        isAvailable={get(props.data, `offices.${office}.firstLesson.verses`)}
        reference={get(props.data, `offices.${office}.firstLesson.ref`)}
        type="First Lesson"
        onPress={scriptureNav('firstLesson')}
      />
      <Card
        isAvailable={get(props.data, `offices.${office}.secondLesson.verses`)}
        reference={get(props.data, `offices.${office}.secondLesson.ref`)}
        type="Second Lesson"
        onPress={scriptureNav('secondLesson')}
      />
      <Card
        isAvailable
        type="Collect"
        reference={get(props.data, `collects.${office}.title`)}
        onPress={collectNav}
      />
    </AppWrapper>
  );
};

const WrappedOffice = withStorage(Office, 'data.attributes')

WrappedOffice.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('type') === 'evening' ? 'Evening Prayer' : 'Morning Prayer',
});

export default WrappedOffice;
