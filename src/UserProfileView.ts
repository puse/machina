export type UserProfileView = {
  open: (username: string) => Promise<unknown>;
  readName: () => Promise<string>;
  readImageUrl: () => Promise<string | undefined>;
  readBio: () => Promise<string | undefined>;
};
