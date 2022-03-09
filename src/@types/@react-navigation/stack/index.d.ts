declare namespace ReactNavigation {
  export interface RootParamList extends RootStackParamList {
    SignIn: NavigationStackProps<string>;
    SignUpFirstStep: NavigationStackProps<string>;
    SignUpSecondStep: NavigationStackProps<string>;
    Home: NavigationStackProps<string>;  
    MyCars: NavigationStackProps<string>;
    CarDetails: NavigationStackProps<string>;  
    Scheduling: NavigationStackProps<string>;  
    SchedulingDetails: NavigationStackProps<string>;  
    Confirmation: NavigationStackProps<string>;
    Profile: NavigationType<string>;
  }
}
