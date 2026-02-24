export function authorize(user, ...roles) {
  if (!user)
    throw { status: 401, message: "Unauthorized" };

  if (!roles.includes(user.role.name))
    throw { status: 403, message: "Forbidden" };
}