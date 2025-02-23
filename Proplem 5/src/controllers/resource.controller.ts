import { Request, Response } from "express";
import Resource from "../models/resource.model";

export const createResource = async (req: Request, res: Response) => {
  try {
    const resource = new Resource(req.body);
    await resource.save();
    res.status(201).json(resource);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getResources = async (req: Request, res: Response) => {
  try {
    const { name, type, sortBy, order } = req.query;

    // Create filter based on query params
    const filter: any = {};
    if (name) filter.name = { $regex: name, $options: "i" }; // Search by name, case insensitive
    if (type) filter.type = type; // Filter by resource type

    // default sort by 'createdAt' descending
    const sort: any = {};
    if (sortBy) sort[sortBy as string] = order === "asc" ? 1 : -1;
    else sort.createdAt = -1;

    // Search data by filter and sort
    const resources = await Resource.find(filter).sort(sort);

    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getResourceById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource)
      return res.status(404).json({ message: "Resource not found" });
    res.json(resource);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateResource = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.params;

    // Check if resource exists
    const resourceExists = await Resource.findById(id);
    if (!resourceExists) {
      return res.status(404).json({ message: "Resource not found" });
    }

    // Update resources
    const updatedResource = await Resource.findByIdAndUpdate(id, req.body, {
      new: true, // Returns the updated record
      runValidators: true, // check data validation
    });

    res.json({
      message: "Resource updated successfully",
      resource: updatedResource,
    });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteResource = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.params;

    const resourceExists = await Resource.findById(id);
    if (!resourceExists) {
      return res.status(404).json({ message: "Resource not found" });
    }

    await Resource.findByIdAndDelete(id);

    res.json({ message: "Resource deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
