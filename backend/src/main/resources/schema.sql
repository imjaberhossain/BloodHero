CREATE TABLE IF NOT EXISTS messages (
                                        id BIGSERIAL PRIMARY KEY,
                                        sender_id BIGINT,
                                        receiver_id BIGINT,
                                        content TEXT,
                                        timestamp TIMESTAMP
);