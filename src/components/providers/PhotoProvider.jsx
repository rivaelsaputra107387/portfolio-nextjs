"use client";

import { createContext, useContext, useState } from "react";

const PhotoContext = createContext();

export function PhotoProvider({ children }) {
  const [activePhotoSection, setActivePhotoSection] = useState("hero");

  return (
    <PhotoContext.Provider value={{ activePhotoSection, setActivePhotoSection }}>
      {children}
    </PhotoContext.Provider>
  );
}

export function usePhoto() {
  return useContext(PhotoContext);
}
