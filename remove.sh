REQUIRED_FILES=$(find ./src/lib -type f -name "*.ts")

echo $REQUIRED_FILES

for REQUIRED_FILE in "${REQUIRED_FILES[@]}"; do
	echo $REQUIRED_FILE
done
