package com.tony.JobZygo.repo;

import com.tony.JobZygo.entity.JobPost;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PostRepo extends MongoRepository<JobPost, String> {
}