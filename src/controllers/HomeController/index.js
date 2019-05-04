class HomeController {

    constructor(express, middleware, models) {
        this.router = express.Router();
        this.middleware = middleware;
        this.models = models;
        this.router.get('/', this.home.bind(this));
        this.router.post('/', this.create.bind(this));
    }

    home = async (req, res) => {
        const result = await this.models.User.findAll();
        return res.json({ result });
    }

    create = async (req, res) => {
        try {
            const result = await this.models.User.create(req.query);
            return res.json({ result });
        } catch (ex) {
            return res.status(400).json({ result: ex });
        }
    }

}

export default (express, middleware, models) => new HomeController(express, middleware, models).router;