export type UserProfileView = {
  open: (username: string) => Promise<void>;
  readName: () => Promise<string>;
  readBio: () => Promise<string | undefined>;
};
