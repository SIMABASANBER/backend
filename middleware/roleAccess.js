const roleAccesss = (userRole, endpoint, method) => {

    const allowedRoles = {
        '/user': {
            GET: ['admin'],
            POST: ['admin'],
            PUT: ['admin'],
            DELETE: ['admin'],
        },
        '/question': {
            GET: ['admin', 'user'],
            POST: ['admin'],
            PUT: ['admin'],
            DELETE: ['admin'],
        },
        '/answer': {
            POST: ['admin', 'user'],
            
        },
        '/rangking': {
            GET: ['admin'],
        }
    }

    const allowedRolesForMethod = allowedRoles[endpoint][method]

    return allowedRolesForMethod.includes(userRole)


}

export default roleAccesss