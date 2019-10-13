import React from 'react';
import styled from 'styled-components';

const Text = styled.Text`
  font-size: 24px;
  line-height: 36px;
`;

const StanzaText = styled.Text`
  line-height: 36px;
  font-size: 24px;
  padding-left: 12px;
`;

const getText = (verses = []) => {
  let currentKey = '';
  let text = '';

  const els = [];

  for (let i = 0; i < verses.length; i++) {
    const verse = verses[i];

    if (verse.type.includes('paragraph')) {
      if (verse.type === 'paragraph text') {
        text += verse.value;
        currentKey = `${verse.chapterNumber}.${verse.verseNumber}.${verse.sectionNumber}`;
      }

      if (verse.type === 'paragraph end') {
        text += '\n';
        els.push(<Text key={currentKey}>{text}</Text>);
        text = '';
      }
    } else if (verse.type.includes('line')) {
      if (verse.type === 'line text') {
        text += verse.value;
        currentKey = `${verse.chapterNumber}.${verse.verseNumber}.${verse.sectionNumber}`;
      }

      if (verse.type === 'line break') {
        text += '\n';
      }

      if (verse.type === 'stanza end' || i === verses.length - 1) {
        text += '\n';
        els.push(<StanzaText key={currentKey}>{text}</StanzaText>);
        text = '';
      }
    }
  }

  return els;
};

export default getText;
