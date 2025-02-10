# Approve Docker client to ECR
aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin 730335258114.dkr.ecr.ap-northeast-2.amazonaws.com

# Docker image creation
docker build -t aira-fe:latest .

# image tag configuration
docker tag aira-fe:latest 730335258114.dkr.ecr.ap-northeast-2.amazonaws.com/aira/fe:latest

# push to ECR
docker push 730335258114.dkr.ecr.ap-northeast-2.amazonaws.com/aira/fe:latest