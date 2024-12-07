# Reactのビルドフォルダの削除
if [ -d "$REACT_BUILD_DIR" ]; then
  rm -rf "$REACT_BUILD_DIR"
  echo "Cleaning up old build folder"
fi

# Reactのビルド
echo "Building React app..."
npm install
npm run build

# Djangoのstatic/reactフォルダを削除
if [ -d "$STATIC_REACT_DIR" ]; then
  rm -rf "$STATIC_REACT_DIR"
  echo "Cleaning up old static/react folder"
fi

# Djangoのstaticfilesフォルダを削除
if [ -d "$STATICFILES_DIR" ]; then
  rm -rf "$STATICFILES_DIR"
  echo "Cleaning up old staticfiles folder"
fi

# Reactビルド成果物をDjangoのstatic/reactにコピー
echo "Copying build folder to $STATIC_REACT_DIR..."
mkdir -p "$STATIC_REACT_DIR"
cp -r "$REACT_BUILD_DIR/"* "$STATIC_REACT_DIR/"

# Djangoのcollectstaticを実行
echo "Running Django collectstatic..."
cd "$DJANGO_MANAGE_DIR"
. "$PYENV_ACTIVATE"
python manage.py collectstatic --noinput
echo "Build and deployment completed successfully."
