FROM node:24-bookworm

# Install basic development tools and dependencies
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
  && apt-get -y install --no-install-recommends \
  curl \
  git \
  vim \
  nano \
  sudo \
  build-essential \
  python3 \
  python3-pip \
  openssh-client \
  ca-certificates \
  gnupg \
  lsb-release \
  jq \
  tree \
  htop \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# Install Docker CLI for Docker-in-Docker support
RUN curl -fsSL https://get.docker.com | sh

# Configure non-root user
ARG USERNAME=node
ARG USER_UID=1000
ARG USER_GID=$USER_UID

RUN groupmod --gid $USER_GID $USERNAME \
  && usermod --uid $USER_UID --gid $USER_GID $USERNAME \
  && usermod -aG docker $USERNAME \
  && chown -R $USER_UID:$USER_GID /home/$USERNAME

# Add sudo support for non-root user
RUN echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
  && chmod 0440 /etc/sudoers.d/$USERNAME

# Set working directory
WORKDIR /workspace

# Switch to non-root user
USER $USERNAME

# Configure npm
RUN npm config set prefix /home/$USERNAME/.npm-global \
  && echo 'export PATH=$HOME/.npm-global/bin:$PATH' >> /home/$USERNAME/.bashrc \
  && echo 'export PATH=$HOME/.npm-global/bin:$PATH' >> /home/$USERNAME/.zshrc
