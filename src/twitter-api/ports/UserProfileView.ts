export type UserProfileView = {
  readName: () => Promise<string>;
  readBio: () => Promise<string | undefined>;
};
