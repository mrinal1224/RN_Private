import { NavigatorScreenParams } from "@react-navigation/native";

export enum RootRoutes {
    AuthStack = 'AuthStack',
    MainTabs = 'MainTabs',
}

export enum AuthRoutes{
    Login = "Login",
    SignUp = 'SignUp'
}

export enum MainRoutes{
    Home = "Home",
    Store = 'Store',
    ProductDetails = 'ProductDetails',
    Checkout = 'Checkout',
    Profile = "Profile",
    Category = 'Category',
    Cart = 'Cart',
    AddAddress = 'AddAddress',
    EditAddress='EditAddress'
}

export type RootStackParamList = {
    [RootRoutes.AuthStack] : undefined;
    [RootRoutes.MainTabs] : undefined
}

export type AuthStackParamList = {
    [AuthRoutes.Login] : undefined;
    [AuthRoutes.SignUp] : undefined;

}

export type MainTabParamList = {
  [MainRoutes.Home]:undefined
  [MainRoutes.Store]:undefined
  [MainRoutes.Cart]:undefined
}
export type MainStackParamList = {
    MainTabs : NavigatorScreenParams<MainTabParamList>
    [MainRoutes.ProductDetails] : {productId : string};
    [MainRoutes.Checkout] : undefined;
    [MainRoutes.Profile] : undefined;
    [MainRoutes.Category] :undefined;
    [MainRoutes.AddAddress] : undefined;
    [MainRoutes.EditAddress] : {addressId : string};
}
