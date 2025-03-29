export function FormatUser(user: any) {
  return {
    id: user._id,
    email: user.email,
    name: user.name,
    bio: user.bio,
    profile_picture: user.profile_picture,
    address: user.address,
  };
}
