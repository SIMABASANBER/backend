const roleAccesss = (userRole, endpoint, method) => {
    console.log(userRole);
    console.log(endpoint);
    console.log(method);

    const allowedRoles = {
        '/user': {
            GET: ['admin'],
            POST: ['admin'],
            UPDATE: ['admin'],
            DELETE: ['admin'],
        },
        '/question': {
            GET: ['admin', 'user'],
            POST: ['admin'],
            UPDATE: ['admin'],
            DELETE: ['admin'],
        },
        '/answer': {
            GET: ['admin',],
            POST: ['admin', 'user'],
            UPDATE: ['admin'],
            DELETE: ['admin'],
        }
    }

    const allowedRolesForMethod = allowedRoles[endpoint][method]
    
    console.log(allowedRolesForMethod);

    return allowedRolesForMethod.includes(userRole)


}

export default roleAccesss