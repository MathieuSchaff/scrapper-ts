import fs from "fs";

export default function getUniqueFilename(
  basePath: string,
  filename: string,
  extension: string = ".json"
): string {
  let counter = 1;
  let newFilename = `${filename}${extension}`;

  while (fs.existsSync(`${basePath}/${newFilename}`)) {
    newFilename = `${filename}-${counter}${extension}`;
    counter += 1;
  }

  return newFilename;
}
