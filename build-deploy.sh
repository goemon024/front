# 設定
REACT_APP_DIR=$(pwd)  # Reactアプリのルートディレクトリ

DJANGO_MANAGE_DIR="/home/goemon024/django/ebing_house"  # Djangoプロジェクトのルートディレクトリ

DJANGO_STATIC_DIR="$DJANGO_MANAGE_DIR/static"  # Djangoの静的ファイルディレクトリ

REACT_BUILD_DIR="$REACT_APP_DIR/build"  # Reactビルド成果物のディレクトリ

STATIC_REACT_DIR="$DJANGO_STATIC_DIR/react"  # Djangoのstatic/reactフォルダ

STATICFILES_DIR="$DJANGO_MANAGE_DIR/staticfiles"  # Djangoのstaticfilesディレクトリ

PYENV_ACTIVATE="$DJANGO_MANAGE_DIR/dg1_env/bin/activate"

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
