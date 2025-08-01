// Simple logging middleware function for frontend or backend
export async function Log(stack: string, level: string, packageName: string, message: string, accessToken: string): Promise<void> {
  try {
    await fetch("http://20.244.56.144/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        stack,
        level,
        packageName,
        message,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (error) {
    console.error("Logging failed:", error);
  }
}

// Helper function with predefined access token
export const logWithToken = (stack: string, level: string, packageName: string, message: string) => {
  const accessToken = "YOUR_ACCESS_TOKEN"; // Replace with real access token
  return Log(stack, level, packageName, message, accessToken);
};

// Convenience functions for different log levels
export const logInfo = (packageName: string, message: string) => 
  logWithToken("frontend", "info", packageName, message);

export const logError = (packageName: string, message: string) => 
  logWithToken("frontend", "error", packageName, message);

export const logDebug = (packageName: string, message: string) => 
  logWithToken("frontend", "debug", packageName, message);

export const logWarning = (packageName: string, message: string) => 
  logWithToken("frontend", "warning", packageName, message);
