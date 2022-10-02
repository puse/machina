export type UserProfileView = {
  open: (username: string) => Promise<void>;
  readName: () => Promise<string>;
  readImageUrl: () => Promise<string | undefined>;
  readBio: () => Promise<string | undefined>;
};
