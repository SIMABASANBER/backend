const roleAccesss = (userRole, endpoint, method) => {

    const allowedRoles = {
        '/user': {
            GET: ['admin'],
            POST: ['admin'],
            DELETE: ['admin'],
        },
        '/question': {
            GET: ['admin', 'user'],
            POST: ['admin'],
            PUT: ['admin'],
            DELETE: ['admin'],
        },
        '/answer': {
            GET: ['admin'],
            POST: ['admin', 'user'],
            UPDATE: ['admin'],
            DELETE: ['admin'],
        },
        '/rangking': {
            GET: ['admin']
        }
    }

    const allowedRolesForMethod = allowedRoles[endpoint][method]

    return allowedRolesForMethod.includes(userRole)


}

export default roleAccesss