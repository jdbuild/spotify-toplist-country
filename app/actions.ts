"use server"; // Markiert alles in dieser Datei als Server-Code

export async function logToServer(message: string) {
  console.log("SERVER LOG:", message);
}


