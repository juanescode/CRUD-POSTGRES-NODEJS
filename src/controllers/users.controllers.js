import { conexion } from "../db.js";

export const getUser = async (req, res) => {
  try {
    const { rows } = await conexion.query("SELECT * FROM users");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await conexion.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const postUsers = async (req, res) => {
  try {
    const data = req.body;
    const { rows } = await conexion.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [data.name, data.email]
    );
    return res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const { rows } = await conexion.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
      [data.name, data.email, id]
    );
    return res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { rowCount } = await conexion.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );

    if (rowCount === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};
