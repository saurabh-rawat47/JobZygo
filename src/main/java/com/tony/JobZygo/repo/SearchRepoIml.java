package com.tony.JobZygo.repo;

import com.mongodb.client.AggregateIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.tony.JobZygo.entity.JobPost;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.convert.MongoConverter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class SearchRepoIml implements SearchRepo {

    @Autowired
    MongoClient client;

    @Autowired
    MongoConverter mongoConverter;


    @Override
    public List<JobPost> findByText(String text) {
        final List<JobPost> jobPosts = new ArrayList<>();

        try {
            MongoDatabase database = client.getDatabase("tony");
            MongoCollection<Document> collection = database.getCollection("JobPost");
            
            // Attempt standard Atlas Search
            AggregateIterable<Document> result = collection.aggregate(Arrays.asList(
                new Document("$search",
                    new Document("index", "jobsearch")
                        .append("text", new Document("query", text)
                            .append("path", Arrays.asList("desc", "techs", "profile", "companyName")))),
                new Document("$sort", new Document("exp", 1L)),
                new Document("$limit", 10L)
            ));
            
            result.forEach(doc -> jobPosts.add(mongoConverter.read(JobPost.class, doc)));
            
            // If Atlas Search returned no results, let's try a fallback regex search
            if (jobPosts.isEmpty()) {
                throw new Exception("Atlas Search returned no results, trying fallback...");
            }
            
        } catch (Exception e) {
            System.out.println("Falling back to Regex Search: " + e.getMessage());
            jobPosts.clear(); // Ensure clean slate for fallback
            
            MongoDatabase database = client.getDatabase("tony");
            MongoCollection<Document> collection = database.getCollection("JobPost");
            
            // Standard Regex Search (Fallback)
            Document query = new Document("$or", Arrays.asList(
                new Document("profile", new Document("$regex", text).append("$options", "i")),
                new Document("companyName", new Document("$regex", text).append("$options", "i")),
                new Document("desc", new Document("$regex", text).append("$options", "i")),
                new Document("techs", new Document("$regex", text).append("$options", "i"))
            ));
            
            collection.find(query).limit(10).forEach(doc -> 
                jobPosts.add(mongoConverter.read(JobPost.class, doc))
            );
        }
        
        return jobPosts;
    }
}
