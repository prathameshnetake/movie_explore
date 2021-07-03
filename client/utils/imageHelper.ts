const basePath = "https://www.themoviedb.org/";

export const getPosterPath = (
  path: string,
  width = 220,
  height = 330,
  version = "face"
) => {
  return `${basePath}/t/p/w${width}_and_h${height}_${version}/${path}`;
};
