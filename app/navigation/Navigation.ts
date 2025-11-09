import { NavigationContainerRef, NavigationState } from "@react-navigation/native";
import { RootStackParamList } from "./Routes";
import React from "react";
import logger from "../utils/Logger";

export const navigationRef = React.createRef<NavigationContainerRef<RootStackParamList>>();

export function parseAndLogRoute(state : NavigationState | undefined){
    if(!state) return 
    const {routes , index} = state
    const currentRoute = routes[index]
    logger.info('Current Route' , {name:currentRoute?.name , params:currentRoute?.params})



}

export function setIsNavigationReady(){
    logger.info("Navigation is Ready")
}