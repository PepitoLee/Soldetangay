import React from 'react';

export enum PageRoute {
  HOME = '/',
  ABOUT = '/nosotros',
  LOCATION = '/ubicacion',
  BENEFITS = '/beneficios',
  LEGAL = '/legal',
  ARCHITECTURE = '/arquitectura',
  COMMERCIAL = '/comercial'
}

export interface NavItem {
  label: string;
  path: PageRoute;
}

export interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  image?: string;
  delay?: number;
}

export interface TimelineItem {
  date: string;
  title: string;
  description: string;
  completed: boolean;
}