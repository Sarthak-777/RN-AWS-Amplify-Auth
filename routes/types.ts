import {NativeStackScreenProps} from '@react-navigation/native-stack';

export enum AuthRoutes {
  Login = 'Login',
  Register = 'Register',
  ConfirmSignUp = 'ConfirmSignUp',
  ForgotPassword = 'ForgotPassword',
}

export enum AppRoutes {
  Home = 'HomeScreen',
}

export type AuthStackParamList = {
  [AuthRoutes.Login]: undefined;
  [AuthRoutes.Register]: undefined;
  [AuthRoutes.ConfirmSignUp]: {username: string};
  [AuthRoutes.ForgotPassword]: undefined;
};

export type AppStackParamList = {
  [AppRoutes.Home]: undefined;
};

export type AuthStackScreenProps<
  RouteName extends keyof AuthStackParamList = AuthRoutes,
> = NativeStackScreenProps<AuthStackParamList, RouteName>;

export type AppStackScreenProps<
  RouteName extends keyof AppStackParamList = AppRoutes,
> = NativeStackScreenProps<AppStackParamList, RouteName>;
