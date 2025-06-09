// tests/utils/logger.ts

export function log(message?: string, testName?: string) {
  const timestamp = new Date().toISOString();
  const stack = new Error().stack ?? "";
  const stackLines = stack.split("\n").map((line) => line.trim());

  const caller = getCallerFunctionName(stackLines);
  const test = testName || getTestFunctionName(stackLines);

  if (message == null) {
    message = "";
  }
  console.log(`[${timestamp}] ${test}() > ${caller}(): ${message}`);
}

function getCallerFunctionName(stackLines: string[]): string {
  for (let i = 2; i < stackLines.length; i++) {
    const match = stackLines[i].match(/at (.*?) \(/);
    if (match && match[1] && match[1] !== "log") {
      return match[1];
    }
  }
  return "unknownFunc";
}

function getTestFunctionName(stackLines: string[]): string {
  for (let i = stackLines.length - 1; i >= 0; i--) {
    const line = stackLines[i];
    const match = line.match(/at (Object\.)?(\w+)/);
    if (match && match[2] && match[2] !== "Object") {
      return match[2];
    }
  }
  return "unknownTest";
}
