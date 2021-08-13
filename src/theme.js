import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: 'black',
    textSecondary: 'white',
    textTernary: 'gray',
    primary: '#0366d6',
    secondary: 'red',
    error: '#d73a4a',
    backgroundMain: '#e1e4e8',
    backgroundPrimary: 'white',
    backgroundSecondary: '#24292e'
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    })
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginTop: 10
  },
  buttonSecondary: {
    padding: 10,
    borderRadius: 5,
    marginTop: 10
  },
  buttonText: {
    alignSelf: 'center'
  },
  input: {
    height: 40,
    marginTop: 15,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
};

theme.button.backgroundColor = theme.colors.primary;
theme.buttonSecondary.backgroundColor = theme.colors.secondary;
theme.buttonText.color = theme.colors.textSecondary;

export default theme;