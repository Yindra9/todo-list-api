
export function createAuthController(service) {
    return {
        async register(req, res) {
            const user = await service.register(req.body);

            res.status(201).json(user);
        },

        async login(req, res) {
            const result = await service.login(req.body);

            res.status(200).json(result);
        },

        me(req, res) {
            res.json(req.user);
        }
    };
}
