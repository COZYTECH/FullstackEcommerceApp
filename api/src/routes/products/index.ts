import { Router } from "express";

const router = Router()
router.get('/', (req, res) => {
    res.send('Hello products!')
  });
  router.get('/:id', (req, res) => {
    res.send('new products created!')
  });

  router.post('/', (req, res) => {
    res.send('new products created!')
  });

  export default router;