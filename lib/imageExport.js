import { toPng, toSvg } from "html-to-image";

const triggerDownload = (dataUrl, filename) => {
  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  link.click();
};

export const snapFilename = (language) => {
  const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  return `codesnap-${language}-${date}`;
};

export const exportAsPng = async (element, filename) => {
  const dataUrl = await toPng(element, {
    pixelRatio: 3,
    cacheBust: true,
  });
  triggerDownload(dataUrl, `${filename}.png`);
};

export const exportAsSvg = async (element, filename) => {
  const dataUrl = await toSvg(element, { cacheBust: true });
  triggerDownload(dataUrl, `${filename}.svg`);
};
