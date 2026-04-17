import { useState } from "react";

export const useAdmin = () => {
  // Auth bypassed — admin panel is open access
  return { isAdmin: true, loading: false };
};
