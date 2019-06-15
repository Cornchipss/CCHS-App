import { StyleSheet } from 'react-native';

const styles = StyleSheet.create(
{
  container:
  {
    flex: 1,
    display: 'flex'
  },
  centerHorizontal:
  {
    alignSelf: 'center',
    textAlign: 'center'
  },
  centerVertical:
  {
    display: 'flex',
    justifyContent: 'center'
  },
  centerAll:
  {
    display: 'flex',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  contentBox:
  {
    display: 'flex',
    paddingLeft: 5,
    paddingRight: 5
  },
  contentTitle:
  {
    fontSize: 24,
    alignSelf: 'center',
    color: '#808080'
  }
});

export { styles };
